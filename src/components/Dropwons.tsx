"use client";
import { useEffect, useState } from "react";
import { Owner } from "@/lib/type";
 
type param = {
    val: string;
    chage: (o: Owner | null) => void
}

export function OwnerSelected({val, chage}: param ) {

    console.log("Owner DropDown Function")
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        
        const loadOwners = async() => {
            try{
                const res = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "GetOwner", payload: {} }),
                });
                
                if(!res.ok) throw new Error("Loadding Owner Failed");
                const data = await res.json();
                setItems(data.data);
            }catch(e){
                console.log("Error",e)
            }
        }

        loadOwners();
    }, [])

    return(
        <select
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none disabled:opacity-60"
            value={val}
            onChange={(e) => {
                const itemData = e.target.value;
                const findData = items.find((item) => item.owner_id === itemData)
                chage(findData);
            }}
        >
            {items.map((o) => (
                <option key={o.owner_id} value={o.owner_id}>
                    {o.owner_code} — {o.owner_name}
                </option>
            ))}
        </select>
    )
}

export function ProductSelected({val, chage}: param ) {

    console.log("Product DropDown Function")
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        
        const loadOwners = async() => {
            try{
                const res = await fetch("/api/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "GetProduct", payload: {} }),
                });
                
                if(!res.ok) throw new Error("Loadding Product Failed");
                const data = await res.json();
                setItems(data.data);
            }catch(e){
                console.log("Error",e)
            }
        }

        loadOwners();
    }, [])

    return(
        <select
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none disabled:opacity-60"
            value={val}
            onChange={(e) => {
                const itemData = e.target.value;
                const findData = items.find((item) => item.product_id === itemData)
                chage(findData);
            }}
        >
            {items.map((o) => (
                <option key={o.product_id} value={o.product_id}>
                    {o.product_code} — {o.product_name}
                </option>
            ))}
        </select>
    )
}