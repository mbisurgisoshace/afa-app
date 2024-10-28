"use client";

import * as z from "zod";
import { Inter } from "next/font/google";
import { useLocalStorage } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/auth/login";
import { toast } from "sonner";

const textFont = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [usuario, setUsuario] = useLocalStorage("usuario", "");
  const [recordarUsuario, setRecordarUsuario] = useState(!!usuario);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      email: usuario || "",
    },
  });

  useEffect(() => {
    if (usuario) {
      setRecordarUsuario(!!usuario);
      form.setValue("email", usuario);
    }
  }, [form, usuario]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      if (!recordarUsuario) setUsuario("");
      if (recordarUsuario) setUsuario(values.email);

      const authResult = await login(values);

      if (authResult && authResult.error) {
        if (authResult.error === "Invalid credentials") {
          toast.error("Datos de acceso incorrectos.");
        } else {
          toast.error("Ha ocurrido un error al iniciar sesion");
        }
      }
    });
  };

  return (
    <Card className="w-[500px] shadow-md p-3">
      <CardHeader>
        <CardTitle
          className={cn(
            "font-semibold text-primary text-3xl",
            textFont.className
          )}
        >
          Bienvenido de vuelta
        </CardTitle>
        <CardDescription
          className={cn("text-xl text-[#747474]", textFont.className)}
        >
          Ingresá tus datos para acceder
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        disabled={isPending}
                        placeholder="test@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <Switch
                  id="recordar"
                  disabled={isPending}
                  checked={recordarUsuario}
                  onCheckedChange={setRecordarUsuario}
                />
                <Label htmlFor="recordar">Recordar mi usuario</Label>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              Ingresar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
