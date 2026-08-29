import React, { useContext } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { ToastContext } from '../context/toast.context'

const toastStyles = {
  success: {
    bg: "bg-white border-l-4 border-[#A9CB98]",
    iconBg: "bg-[#A9CB98]/20",
    iconColor: "text-green-700",
    Icon: CheckCircle2,
  },
  error: {
    bg: "bg-white border-l-4 border-red-500",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    Icon: XCircle,
  },
}

const Toast = () => {

    const {toast} = useContext(ToastContext);

    if(!toast){
        return null
    }

  const style = toastStyles[toast.type] || toastStyles.success
  const { Icon } = style

  return (
    <div className={`flex items-start gap-3 rounded-2xl shadow-lg p-4 w-full max-w-sm ${style.bg}`}>

      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${style.iconBg}`}>
        <Icon size={16} className={style.iconColor} />
      </div>

      <p className="text-sm text-neutral-700 leading-snug flex-1 pt-1">
        {toast.message}
      </p>

    </div>
  )
}

export default Toast