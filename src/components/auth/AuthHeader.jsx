import LogoIcon from './LogoIcon'

export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center text-center">
      <LogoIcon size="md" />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[48px] lg:leading-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 max-w-sm text-base leading-relaxed text-secondary sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
