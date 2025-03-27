"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supbase/server";

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await (
    await supabase
  ).auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `http://localhost:3002/auth/callback`,
    },
  });
  console.log(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}


export async function storeUserData(userData: any) {
  const supabase = createClient();

  console.log("Inserting user:", {
    id: userData.id,
    email: userData.email,
    name: userData.user_metadata?.full_name,
    avatar: userData.user_metadata?.avatar_url,
  });

  // Check if user already exists
  const { data: existingUser, error: fetchError } = await (await supabase)
    .from("users")
    .select("*")
    .eq("id", userData.id)
    .single();

  // if (fetchError) {
  //   console.error("Error checking for existing user:", fetchError);
  //   return { error: fetchError };
  // }

  // If user doesn't exist, insert
  if (!existingUser) {
    const { data, error } = await (await supabase).from("users").insert([
      {
        id: userData.id,
        email: userData.email,
        name: userData.user_metadata?.full_name,
        avatar: userData.user_metadata?.avatar_url,
      },
    ]);

    if (error) {
      console.error("Error inserting user data:", error);
      return { error };
    }

    return { data };
  } else {
    // Update user if they exist
    const { data, error } = await (await supabase)
      .from("users")
      .update({
        email: userData.email,
        name: userData.user_metadata?.full_name,
        avatar: userData.user_metadata?.avatar_url,
      })
      .eq("id", userData.id);

    if (error) {
      console.error("Error updating user data:", error);
      return { error };
    }

    return { data };
  }
}














// export async function getSession() {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

//   const { data, error } = await supabase.auth.getSession();
//   console.log(data);

//   if (error) {
//     console.error("Error getting session:", error);
//     return { error: error.message };
//   }

//   return { session: data.session };
// }



















// export async function storeUserData(userData: any) {
//   const supabase = createClient();

//   // Check if user already exists in the 'users' table
//   const { data: existingUser, error: fetchError } =  await (await supabase)
//     .from("users")
//     .select("*")
//     .eq("id", userData.id)
//     .single();

//   if (!existingUser) {
//     // Insert new user
//     const { data, error } =  await (await supabase).from("users").insert([
//       {
//         id: userData.id,
//         email: userData.email,
//         name: userData.user_metadata?.full_name,
//         avatar: userData.user_metadata?.avatar_url,
//       },
//     ]);

//     if (error) {
//       console.error("Error inserting user data:", error);
//       return { error };
//     }

//     return { data };
//   } else {
//     // Update existing user
//     const { data, error } =  await (await supabase)
//       .from("users")
//       .update({
//         email: userData.email,
//         name: userData.user_metadata?.full_name,
//         avatar: userData.user_metadata?.avatar_url,
//       })
//       .eq("id", userData.id);

//     if (error) {
//       console.error("Error updating user data:", error);
//       return { error };
//     }

//     return { data };
//   }
// }

























// export async function storeUserData(userData: any) {
//   const supabase = createClient();

//   // Check if user already exists in the 'users' table
//   const { data: existingUser, error: fetchError } = await (await supabase)
//     .from("users")
//     .select("*")
//     .eq("id", userData.id)
//     .single();

//   // if (fetchError && fetchError.code !== "PGRST116") {
//   //   console.error("Error checking for existing user:", fetchError);
//   //   return { error: fetchError };
//   // }

//   // If user doesn't exist, insert new user
//   if (!existingUser) {
//     const { data, error } = await (await supabase).from("users").insert([
//       {
//         id: userData.id,
//         email: userData.email,
//         name: userData.user_metadata?.full_name,
//         avatar: userData.user_metadata?.avatar_url,
//       },
//     ]);

//     if (error) {
//       console.error("Error inserting user data:", error);
//       return { error };
//     }

//     return { data };
//   }
//   // Update existing user data
//   else {
//     const { data, error } = await (
//       await supabase
//     )
//       .from("users")
//       .update({
//         email: userData.email,
//         name: userData.user_metadata?.full_name,
//         avatar: userData.user_metadata?.avatar_url,
//       })
//       .eq("id", userData.id);

//     if (error) {
//       console.error("Error updating user data:", error);
//       return { error };
//     }

//     return { data };
//   }
// }
