import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/superbase/server";
import { tree } from "next/dist/build/templates/app-page";
import { error } from "console";

export async function POST(req: Request) {
    
    const { type, payload } = await req.json()
    const supabase = await createClient();

    if(type === "fetchProduct"){

        try{
            const _data = await supabase
                .from("master_product")
                .select(`product_id
                        ,product_code 
                        ,product_name
                        ,unit_code
                        ,price
                `)

            console.log("fetch product success!");
            return NextResponse.json({ status: true, data: _data.data })
        }catch(e){
            console.error("ERROR fetch products:", e);
            return NextResponse.json(
                { error: "Cannot GET product from DB"},
                { status: 500 }
            )
        }
    } else if(type === "createProduct"){
        
        try{
            const _data = await supabase
                .from("master_product")
                .insert([
                    {
                        product_code: payload.product_code,
                        product_name: payload.product_name,
                        unit_code: payload.unit_code,
                        price: payload.price
                    }
                ])
                .select()
                .single()

                console.log("created product success!");
                return NextResponse.json({ status: true, data: _data })
        }catch(e){
            console.error("ERROR insert products:", e);
            return NextResponse.json(
                { error: "Cannot insert product to DB"},
                { status: 500 }
            )
        } 
    } else if(type === "updateProduct"){

        try{
            const _data = await supabase
                .from("master_product")
                .update({
                    product_code: payload.product_code,
                    product_name: payload.product_name,
                    unit_code: payload.unit_code,
                    price: payload.price
                })
                .eq("product_id", payload.product_id)
                .select()
                .single();

                console.log("update product success!");
                return NextResponse.json({ status: true, data: _data })
        }catch(e){
            console.error("ERROR insert products:", e);
            return NextResponse.json(
                { error: "Cannot update product to DB"},
                { status: 500 }
            )
        }
    } else if(type === "deleteProduct"){
        
        try{

            const _data = await supabase
                .from("master_product")
                .delete()
                .eq("product_id", payload.product_id)

                console.log("delete product success!");
                return NextResponse.json({ status: true, data: _data })
        }catch(e){
            console.error("ERROR insert products:", e);
            return NextResponse.json(
                { error: "Cannot delete product to DB"},
                { status: 500 }
            )
        }
    } else if(type === "GetProduct") {
        try{
            const _data = await supabase
                .from("master_product")
                .select(`product_id
                        ,product_code
                        ,product_name
                `)

            console.log("Get product success!");
            return NextResponse.json({ status: true, data: _data.data })
        }catch(e){
            console.error("ERROR Get product:", e);
            return NextResponse.json(
                { error: "Cannot GET user from DB"},
                { status: 500 }
            )
        }
    }
}
