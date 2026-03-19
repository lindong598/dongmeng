import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { CloudMoon, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <CloudMoon
          size={80}
          className="text-aurora-purple/30 animate-float"
        />
        <h1 className="font-display text-3xl text-aurora-cyan">迷失在梦境中</h1>
        <p className="text-sm text-muted-foreground/70 font-serif max-w-md">
          你似乎走进了一个不存在的梦境。也许这个梦还没开始，又或者它早已消散在晨光中。
        </p>
        <Button
          variant="outline"
          className="gap-2 font-serif cursor-pointer mt-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={14} />
          返回梦境档案
        </Button>
      </div>
    </PageTransition>
  );
}
