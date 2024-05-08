
import { ProgressSpinner } from 'primereact/progressspinner';

const Spinner: React.FC = (props: any) => {
  return(
    <div className="absolute z-5 w-full h-full flex justify-content-center align-items-center">
      <ProgressSpinner />
    </div>
  )
}

export { Spinner };