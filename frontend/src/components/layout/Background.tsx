interface Props {
  children: React.ReactNode
}

const Background = ({ children }: Props) => {
  return <div className="min-h-screen bg-gray-100">{children}</div>
}

export default Background
