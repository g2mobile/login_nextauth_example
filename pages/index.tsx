import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("credentials",
        {email: "paugustoneto@gmail.com", password: "123", redirect: false})
        .then( (result:any) => {
          if (result.error !== null)
          {
              if (result.status === 401)
              {
                  console.log("Your username/password combination was incorrect. Please try again")
              }
              else
              {
                  console.log(result.error);
              }
          }
          else
          {
              console.log('Redireciona rota.');
              //router.push(result.url);
          }
        })}
      >Sign in</button>
    </>
  )


}