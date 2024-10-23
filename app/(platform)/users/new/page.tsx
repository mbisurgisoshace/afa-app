"use client";

import * as z from "zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser } from "@/actions/auth/admin";
import { generateRandomPassword } from "@/lib/utils";
import { DottedSeparator } from "@/components/DottedSeparator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NewUser() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      nombre: "",
      apellido: "",
      password: "",
      role: UserRole.USER,
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      const newUser = await createUser(values);

      if (newUser && newUser.error) {
        console.log("error", newUser.error);
        return;
      }

      router.push("/users");
    });
  };

  return (
    <div className="w-full max-w-[598px] m-auto">
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg flex flex-row gap-5">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4 pb-8 mb-8">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={isPending}
                          placeholder="Juan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={isPending}
                          placeholder="Gonzalez"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
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
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <div className="flex flex-row gap-2 items-center">
                          <Input {...field} type="text" disabled={isPending} />
                          <Button
                            size={"xs"}
                            type="button"
                            variant={"secondary"}
                            onClick={() =>
                              form.setValue(
                                "password",
                                generateRandomPassword()
                              )
                            }
                          >
                            Generar
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Rol *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-1"
                        >
                          <FormItem className="flex items-center space-x-3">
                            <FormControl className="hidden">
                              <RadioGroupItem
                                value={UserRole.ADMIN}
                                id={UserRole.ADMIN}
                              />
                            </FormControl>

                            <Button
                              size={"sm"}
                              type="button"
                              variant={
                                field.value === UserRole.ADMIN
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              <FormLabel
                                className="font-normal cursor-pointer"
                                htmlFor={UserRole.ADMIN}
                              >
                                Administrador
                              </FormLabel>
                            </Button>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3">
                            <FormControl className="hidden">
                              <RadioGroupItem
                                value={UserRole.USER}
                                id={UserRole.USER}
                              />
                            </FormControl>

                            <Button
                              size={"sm"}
                              type="button"
                              variant={
                                field.value === UserRole.USER
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              <FormLabel
                                className="font-normal cursor-pointer"
                                htmlFor={UserRole.USER}
                              >
                                Usuario regular
                              </FormLabel>
                            </Button>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DottedSeparator />

              <div className="flex flex-row items-center justify-between gap-4">
                <Button asChild type="button" variant={"outline"}>
                  <Link href="/users" className="flex items-center gap-2">
                    <span className="text-sm font-medium">Cancelar</span>
                  </Link>
                </Button>

                <Button
                  type="submit"
                  variant={"default"}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm font-medium">Crear</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
