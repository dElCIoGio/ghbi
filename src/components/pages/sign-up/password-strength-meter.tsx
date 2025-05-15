
import { motion } from "framer-motion"
import type { PasswordStrength } from "@/types/auth"

interface PasswordStrengthMeterProps {
    strength: PasswordStrength
}

export default function PasswordStrengthMeter({ strength }: PasswordStrengthMeterProps) {
    const getStrengthColor = (strength: PasswordStrength) => {
        switch (strength) {
            case "strong":
                return "bg-green-500"
            case "medium":
                return "bg-amber-500"
            case "weak":
            default:
                return "bg-red-500"
        }
    }

    const getStrengthWidth = (strength: PasswordStrength) => {
        switch (strength) {
            case "strong":
                return "w-full"
            case "medium":
                return "w-2/3"
            case "weak":
            default:
                return "w-1/3"
        }
    }

    const getStrengthText = (strength: PasswordStrength) => {
        switch (strength) {
            case "strong":
                return "Strong password"
            case "medium":
                return "Medium password"
            case "weak":
            default:
                return "Weak password"
        }
    }

    return (
        <div className="space-y-1">
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${getStrengthColor(strength)}`}
                    initial={{ width: 0 }}
                    animate={{ width: getStrengthWidth(strength) }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <p className="text-xs text-muted-foreground">{getStrengthText(strength)}</p>
        </div>
    )
}
