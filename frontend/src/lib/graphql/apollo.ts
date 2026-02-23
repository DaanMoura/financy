import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, Observable } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuthStore } from '../../stores/auth'

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`
})

const authLink = new SetContextLink(prevContext => {
  const token = useAuthStore.getState().token
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

let isRefreshing = false
let pendingRequests: (() => void)[] = []

const resolvePendingRequests = () => {
  pendingRequests.forEach(callback => callback())
  pendingRequests = []
}

const errorLink = onError(({ graphQLErrors, operation, forward }: any) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        const { refreshToken, logout } = useAuthStore.getState()

        if (!refreshToken) {
          logout()
          return
        }

        if (isRefreshing) {
          return new Observable(observer => {
            pendingRequests.push(() => {
              forward(operation).subscribe(observer)
            })
          })
        }

        isRefreshing = true

        return new Observable(observer => {
          fetch(`${import.meta.env.VITE_BACKEND_URL}/graphql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: `
                mutation RefreshToken($refreshToken: String!) {
                  refreshToken(refreshToken: $refreshToken) {
                    token
                    refreshToken
                    user {
                      id
                      name
                      email
                      createdAt
                      updatedAt
                    }
                  }
                }
              `,
              variables: {
                refreshToken
              }
            })
          })
            .then(res => res.json())
            .then(async response => {
              const data = response.data?.refreshToken
              if (data) {
                useAuthStore.setState({
                  token: data.token,
                  refreshToken: data.refreshToken,
                  user: data.user,
                  isAuthenticated: true
                })
                resolvePendingRequests()
                forward(operation).subscribe(observer)
              } else {
                throw new Error('Refresh token failed')
              }
            })
            .catch(() => {
              pendingRequests = []
              logout()
              observer.error(new Error('Refresh token failed'))
            })
            .finally(() => {
              isRefreshing = false
            })
        })
      }
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    },
  },
  cache: new InMemoryCache()
})
