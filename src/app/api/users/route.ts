import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/superbase/server";
import { tree } from "next/dist/build/templates/app-page";
import { error } from "console";

export async function POST(req: Request, res: Response) {
    
    const { type, payload } = await req.json()
    const supabase = await createClient();

    if(type === "fetchUser"){

        try{
            const _data = await supabase
                .from("master_owner")
                .select(`owner_id
                        ,owner_code
                        ,owner_name
                        ,address
                        ,phone
                `)

            console.log("fetch user success!");
            return NextResponse.json({ status: true, data: _data.data })
        }catch(e){
            console.error("ERROR fetch user:", e);
            return NextResponse.json(
                { error: "Cannot GET user from DB"},
                { status: 500 }
            )
        }
    } else if(type === "createUser"){
        
        try{
            const _data = await supabase
                .from("master_owner")
                .insert([
                    {
                        owner_code: payload.owner_code,
                        owner_name: payload.owner_name,
                        address: payload.address,
                        phone: payload.phone
                    }
                ])
                .select()
                .single()

                console.log("created user success!");
                return NextResponse.json({ status: true, data: _data })
        }catch(e){
            console.error("ERROR insert user:", e);
            return NextResponse.json(
                { error: "Cannot insert user to DB"},
                { status: 500 }
            )
        } 
    } else if(type === "updateUser"){

        try{
            const _data = await supabase
                .from("master_owner")
                .update({
                    owner_code: payload.owner_code,
                    owner_name: payload.owner_name,
                    address: payload.address,
                    phone: payload.phone
                })
                .eq("owner_id", payload.owner_id)
                .select()
                .single();

                console.log("update product success!");
                return NextResponse.json({ status: true, data: _data })
        }catch(e){
            console.error("ERROR insert user:", e);
            return NextResponse.json(
                { error: "Cannot update user to DB"},
                { status: 500 }
            )
        }
    } else if(type === "deleteUser"){
        
        try{

            const _data = await supabase
                .from("master_owner")
                .delete()
                .eq("owner_id", payload.owner_id)

                console.log("delete user success!");
                return NextResponse.json({ status: true, data: _data })
        }catch(e){
            console.error("ERROR insert user:", e);
            return NextResponse.json(
                { error: "Cannot delete user to DB"},
                { status: 500 }
            )
        }
    } else if(type === "GetOwner") {
        try{
            const _data = await supabase
                .from("master_owner")
                .select(`owner_id
                        ,owner_code
                        ,owner_name
                `)

            console.log("Get user success!");
            return NextResponse.json({ status: true, data: _data.data })
        }catch(e){
            console.error("ERROR Get user:", e);
            return NextResponse.json(
                { error: "Cannot GET user from DB"},
                { status: 500 }
            )
        }
    }
}
