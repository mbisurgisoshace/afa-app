import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PersonasJuridicas() {
  return (
    <AccordionItem
      value="personas_juridicas"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Datos Personas Juridicas</AccordionTrigger>
      <AccordionContent></AccordionContent>
    </AccordionItem>
  );
}
