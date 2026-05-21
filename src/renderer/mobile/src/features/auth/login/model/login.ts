import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLoginForm = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/') // API가 없는관계로 임시로 라우팅 설정
  }

  return { id, setId, password, setPassword, handleLogin }
}