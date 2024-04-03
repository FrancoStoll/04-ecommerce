import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
}


export const OrderSatus = ({ isPaid }: Props) => {
  return (
    <div className={
      clsx(
        "flex items-center rounded py-2 px-3.5 font bold text-white mb-5",
        {
          'bg-red-500': !isPaid,
          'bg-green-700': isPaid,
        }
      )
    }>
      <IoCardOutline size={30} />
      <span className="mx-2">{isPaid ? 'Pagado' : 'No pagado'}</span>
    </div>
  )
}