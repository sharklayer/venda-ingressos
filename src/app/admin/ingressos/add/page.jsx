'use client'

import { api } from "@/api"
import { IngressoForm } from "@/components/IngressosForm";
import IngressosTable from "@/components/IngressosTable";
import { useEffect, useState } from "react";

export default function Ingressos() {
    return (
        <div>
            <IngressoForm  />
        </div>
    )
}