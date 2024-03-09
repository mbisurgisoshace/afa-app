import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PersonasHumanas() {
  return (
    <AccordionItem
      value="personas_humanas"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Datos Personas Humanas</AccordionTrigger>
      <AccordionContent></AccordionContent>
    </AccordionItem>
  );
}
