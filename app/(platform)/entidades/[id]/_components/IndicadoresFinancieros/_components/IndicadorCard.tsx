import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IndicadorCardProps {
  title: string;
  footer: string;
  description: string;
}

export default function IndicadorCard({
  title,
  footer,
  description,
}: IndicadorCardProps) {
  return (
    <Card className="w-full max-w-[350px] flex flex-col justify-between">
      <CardHeader className="relative">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {description}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="text-muted-foreground">{footer}</div>
      </CardFooter>
    </Card>
  );
}
