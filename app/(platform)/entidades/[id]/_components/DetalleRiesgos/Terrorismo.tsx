import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export default function Terrorismo() {
  return (
    <div className="w-[550px]">
      <Card>
        <CardHeader>
          <CardTitle>
            % de Coincidencia con Terroristas/Organizaciones Terroristas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex  justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-green-500">45.00%</span>
            <span className="text-xs text-muted-foreground">
              Fecha ultimo cotejo: 01/01/2024
            </span>
          </div>
          <Button size={"xs"} className="self-end">
            Cotejar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
