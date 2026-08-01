import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import AuthHeader from './AuthHeader'
import InputField from './InputField'
import ForgotPasswordLink from './ForgotPasswordLink'
import { toast } from 'react-toastify'
import {
  validatePassword,
  validateRequired,
} from '../../utils/validation'

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = { username: '', password: '' }

export default function LoginCard() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!validateRequired(form.username)) {
      nextErrors.username = 'Username is required'
    }

    if (!validateRequired(form.password)) {
      nextErrors.password = 'Password is required'
    } else if (!validatePassword(form.password)) {
      nextErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/public/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const token = await response.text();

      if (!response.ok) {
        throw new Error(token || "Login failed");
      }

      localStorage.setItem("token", token);

      fetch(`${import.meta.env.VITE_API_URL}/user/getName`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => res.text()).then((data) => {
        localStorage.setItem("username", data);
      }).catch((err) => {
        console.error('Error fetching username:', err);
      });
      navigate("/dashboard", {
        replace: true,
        state: {
          toastMessage: "Successfully logged in",
        },
      });
    } catch (err) {
      const errorMessage =
        err instanceof TypeError && err.message.includes('Failed to fetch')
          ? 'Connection refused. Please try again after some time.'
          : err instanceof Error
          ? err.message
          : 'Something went wrong'
      toast.error(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      padding="md"
      className="animate-slide-up w-full max-w-md rounded-[24px] sm:rounded-[32px] border border-primary/20 bg-surface/90 px-5 py-6 sm:px-10 sm:py-10 shadow-2xl shadow-primary/10 backdrop-blur-xl transition-all hover:border-primary/30"
    >
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue building and managing your database architecture."
      />

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" noValidate>
        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange('username')}
          error={errors.username}
          required
          autoComplete="username"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm sm:text-[15px] font-semibold text-primary">
              Password
            </label>
            <ForgotPasswordLink />
          </div>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange('password')}
            required
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : undefined}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="h-11 sm:h-13 w-full rounded-2xl border border-primary/15 bg-background/80 px-4 text-sm sm:text-base text-primary placeholder:text-secondary/60 transition-all duration-250 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />

          {errors.password && (
            <p id="password-error" className="text-xs sm:text-sm font-medium text-red-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
          className="h-11 sm:h-13 text-sm sm:text-base font-bold shadow-lg shadow-primary/10 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Login
        </Button>
      </form>

      <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-secondary">
        Don&apos;t have an account?{' '}
        <Link
          to="/signup"
          className="font-bold text-primary underline underline-offset-4 transition-colors duration-250 hover:text-amber-600"
        >
          Sign Up
        </Link>
      </p>
    </Card>
  )
}
