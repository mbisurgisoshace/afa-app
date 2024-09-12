"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { UserRole } from "@prisma/client";
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
import { generateRandomPassword } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createUser } from "@/actions/auth/admin";
import { PlusCircleIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    <div className="w-full max-w-[1196px] m-auto">
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 border-b border-[#E2E8F0] pb-8 mb-8">
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
                          size={"sm"}
                          type="button"
                          onClick={() =>
                            form.setValue("password", generateRandomPassword())
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
              {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el rol del usuario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>ADMIN</SelectItem>
                        <SelectItem value={UserRole.USER}>USUARIO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl className="hidden">
                            <RadioGroupItem
                              value={UserRole.ADMIN}
                              id={UserRole.ADMIN}
                            />
                          </FormControl>

                          <Button
                            type="button"
                            className="rounded-2xl"
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
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl className="hidden">
                            <RadioGroupItem
                              value={UserRole.USER}
                              id={UserRole.USER}
                            />
                          </FormControl>

                          <Button
                            type="button"
                            className="rounded-2xl cursor-pointer"
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
            <div className="flex flex-row items-center gap-4">
              <Button
                type="submit"
                variant={"outline"}
                className="rounded-2xl flex items-center gap-2 text-primary"
              >
                <PlusCircleIcon />
                <span className="text-sm font-semibold">Crear usuario</span>
              </Button>

              <Button
                asChild
                type="button"
                variant={"outline"}
                className="border-destructive text-destructive rounded-2xl"
              >
                <Link href="/users" className="flex items-center gap-2">
                  <XCircleIcon />
                  <span className="text-sm font-semibold">Cancelar</span>
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
