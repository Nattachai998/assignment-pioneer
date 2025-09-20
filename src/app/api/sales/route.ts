import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
    
    const { type, playload } = await req.json()
    
    if(type === "CreateSales"){
        
        
    }
}
