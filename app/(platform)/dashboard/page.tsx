import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  console.log("session", session);

  // const onClick = async () => {
  //   await updateTerroristas();
  // };

  return <div>{/* <Button onClick={onClick}>Terroristas</Button> */}</div>;
}
