'use client'

import { api } from "@/api"
import { EventoForm } from "@/components/EventosForm";
import EventosTable from "@/components/EventosTable";
import { useEffect, useState } from "react";

export default function Eventos() {
    return (
        <div>
            <EventoForm  />
        </div>
    )
}