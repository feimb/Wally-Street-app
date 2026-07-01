const INTEGRANTES = [
  'Fei Mosqueda',
  'Leonardo Fernandez',
]


export const FooterComponent = () => {
  return (
    <footer className="fixed bottom-0 w-full  bg-neutral-900 border-t border-neutral-800 px-8 py-1 text-center flex justify-center gap-2 items-baseline">
      <p className="text-neutral-400 text-sm">2026</p>
      <p className="text-neutral-300 text-sm mt-1">
        {INTEGRANTES.join(' · ')}
      </p>
    </footer>
  )
}