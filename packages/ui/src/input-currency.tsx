import * as React from "react";
import { Input } from "./input";

export interface InputCurrencyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({ ...props }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-muted-foreground">R$</span>
          </div>
          <Input
            ref={ref}
            id="currency"
            type="number"
            placeholder="0.00"
            className="pl-9"
            step={0.01}
            {...props}
          />
        </div>
      </div>
    );
  },
);
InputCurrency.displayName = "InputCurrency";

export { InputCurrency };
