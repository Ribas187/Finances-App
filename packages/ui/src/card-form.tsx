import { InputHTMLAttributes, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";

type CardFormProps = {
  title: string;
  description: string;
  helpText?: string;
  inputAttrs: InputHTMLAttributes<HTMLInputElement>;
  submitButtonText?: string;
  handleSubmit: (data: any) => Promise<any>;
}

export function CardForm({
  title,
  description,
  inputAttrs,
  helpText,
  submitButtonText = "Salvar alterações",
  handleSubmit,
}: CardFormProps) {
  const [value, setValue] = useState(inputAttrs.defaultValue);
  const [saving, setSaving] = useState(false);

  const savingDisabled = useMemo(() => {
    return saving || !value || value === inputAttrs.defaultValue
  }, [saving, value, inputAttrs.defaultValue]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await handleSubmit({
          [inputAttrs.name as string]: value
        })
        setSaving(false);
      }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            {...inputAttrs}
            className="max-w-lg"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </CardContent>
        <CardFooter className="border-t py-4 flex justify-between w-full">
          {helpText && <p className="text-muted-foreground text-sm">{helpText}</p>}
          <div className="shrink-0">
            <Button loading={saving} disabled={savingDisabled}>{submitButtonText}</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}