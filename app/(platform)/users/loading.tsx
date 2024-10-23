import { Loader } from "lucide-react";

const UsersLoading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader className="size-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default UsersLoading;
