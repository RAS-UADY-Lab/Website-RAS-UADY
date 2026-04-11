"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactoPage() {
  // Estados para el manejo del formulario
  const [formData, setFormData] = useState({
    asunto: "1",
    asuntoPers: "",
    email: "",
    nombre: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Validación reactiva: El botón se activa solo si los campos obligatorios tienen texto
  const isFormValid =
    formData.asunto === "6"
      ? formData.asuntoPers.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.nombre.trim() !== "" &&
        formData.mensaje.trim() !== ""
      : formData.email.trim() !== "" &&
        formData.nombre.trim() !== "" &&
        formData.mensaje.trim() !== "";

  // Manejador del envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("loading");
    setFeedbackMessage("Enviando mensaje...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const data = await response.json();

      if (data.exito) {
        setStatus("success");
        setFeedbackMessage(data.mensaje);
        setFormData({
          asunto: "1",
          asuntoPers: "",
          email: "",
          nombre: "",
          mensaje: "",
        });
      } else {
        setStatus("error");
        setFeedbackMessage(data.mensaje);
      }
    } catch (error) {
      console.error("Error en fetch:", error);
      setStatus("error");
      setFeedbackMessage(
        "Error de conexión con el servidor. Por favor, inténtalo más tarde.",
      );
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* HEADER DE SECCIÓN */}
      <section className="bg-white pt-32 pb-12 md:pt-40 md:pb-16 border-b border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-6">
            Contacto
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed text-pretty">
            ¿Tienes dudas, comentarios o quieres más información para unirte al
            capítulo? Escríbenos y con gusto te responderemos. Estamos aquí para
            ayudarte a dar tus primeros pasos en el mundo de la robótica y
            automatización.
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL: Información y Formulario */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* COLUMNA IZQUIERDA: Canales de contacto directo */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h2 className="text-2xl font-bold bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-4">
                Canales directos
              </h2>

              <a
                href="mailto:ras.fiuady@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="flex items-center gap-5 p-5">
                    <div className="flex items-center justify-center w-10">
                      <i className="icon-Mail text-3xl text-neutral-400 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-[#5f2167] group-hover:to-[#98002e]"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest transition-colors duration-300 group-hover:text-neutral-500">
                        Correo Electrónico
                      </p>
                      <p className="text-sm font-medium text-neutral-800">
                        ras.fiuady@gmail.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a
                href="http://wa.me/9993790275"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="flex items-center gap-5 p-5">
                    <div className="flex items-center justify-center w-10">
                      <i className="icon-WhatsApp text-3xl text-neutral-400 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-[#5f2167] group-hover:to-[#98002e]"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest transition-colors duration-300 group-hover:text-neutral-500">
                        WhatsApp
                      </p>
                      <p className="text-sm font-medium text-neutral-800">
                        999 379 0275
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a
                href="https://maps.app.goo.gl/ytFjqGruZMtRvYZY8"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="flex items-center gap-5 p-5">
                    <div className="flex items-center justify-center w-10">
                      <i className="icon-mapa text-3xl text-neutral-400 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-[#5f2167] group-hover:to-[#98002e]"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest transition-colors duration-300 group-hover:text-neutral-500">
                        Ubicación
                      </p>
                      <p className="text-sm font-medium text-neutral-800 leading-snug">
                        Facultad de Ingeniería - UADY
                        <br />
                        Mérida, Yucatán, México
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Redes Sociales (Íconos Cuadrados Centrados) */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <a
                  href="https://www.facebook.com/RAS.UADY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-md border border-neutral-200 bg-white text-neutral-400 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md hover:-translate-y-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#5f2167] hover:to-[#98002e] cursor-pointer"
                >
                  <i className="icon-Facebook2 text-2xl"></i>
                </a>
                <a
                  href="https://www.instagram.com/ras.uady/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-md border border-neutral-200 bg-white text-neutral-400 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md hover:-translate-y-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#5f2167] hover:to-[#98002e] cursor-pointer"
                >
                  <i className="icon-Instagram1 text-2xl"></i>
                </a>
                <a
                  href="https://linktr.ee/RAS.UADY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-md border border-neutral-200 bg-white text-neutral-400 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md hover:-translate-y-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#5f2167] hover:to-[#98002e] cursor-pointer"
                >
                  <i className="icon-LinkExterno text-2xl"></i>
                </a>
              </div>
            </div>

            {/* COLUMNA DERECHA: Formulario Reactivo */}
            <div className="lg:col-span-3">
              <Card className="card-brand ring-0 bg-white p-2 md:p-4">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                    Envíanos un mensaje
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo: Asunto */}
                    <div className="space-y-2">
                      <label
                        htmlFor="Asunto"
                        className={`text-sm font-bold transition-all duration-300 ${formData.asunto ? "bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent" : "text-neutral-700"}`}
                      >
                        Asunto
                      </label>
                      <select
                        id="Asunto"
                        name="Asunto"
                        value={formData.asunto}
                        onChange={(e) =>
                          setFormData({ ...formData, asunto: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#98002e]/20 focus:border-[#98002e] transition-colors"
                      >
                        <option value="1">Duda</option>
                        <option value="2">Sugerencia</option>
                        <option value="3">Opinión</option>
                        <option value="4">Reporte/Queja</option>
                        <option value="5">Invitación</option>
                        <option value="6">Otro</option>
                      </select>
                    </div>

                    {/* Campo Condicional: Asunto Personalizado */}
                    {formData.asunto === "6" && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label
                          htmlFor="asuntoPers"
                          className={`text-sm font-bold transition-all duration-300 ${formData.asuntoPers.trim() !== "" ? "bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent" : "text-neutral-700"}`}
                        >
                          Especifique el asunto
                        </label>
                        <input
                          type="text"
                          id="asuntoPers"
                          name="asuntoPers"
                          placeholder="Ej. Propuesta de proyecto..."
                          value={formData.asuntoPers}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              asuntoPers: e.target.value,
                            })
                          }
                          className="w-full h-11 px-4 rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#98002e]/20 focus:border-[#98002e] transition-colors"
                        />
                      </div>
                    )}

                    {/* Grid para Email y Nombre */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="Nombre"
                          className={`text-sm font-bold transition-all duration-300 ${formData.nombre.trim() !== "" ? "bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent" : "text-neutral-700"}`}
                        >
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          id="Nombre"
                          name="Nombre"
                          placeholder="Juan Pérez"
                          value={formData.nombre}
                          onChange={(e) =>
                            setFormData({ ...formData, nombre: e.target.value })
                          }
                          className="w-full h-11 px-4 rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#98002e]/20 focus:border-[#98002e] transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className={`text-sm font-bold transition-all duration-300 ${formData.email.trim() !== "" ? "bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent" : "text-neutral-700"}`}
                        >
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="alguien@ejemplo.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full h-11 px-4 rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#98002e]/20 focus:border-[#98002e] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Campo: Mensaje */}
                    <div className="space-y-2">
                      <label
                        htmlFor="Mensaje"
                        className={`text-sm font-bold transition-all duration-300 ${formData.mensaje.trim() !== "" ? "bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent" : "text-neutral-700"}`}
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="Mensaje"
                        name="Mensaje"
                        placeholder="Escriba su mensaje aquí..."
                        rows={5}
                        value={formData.mensaje}
                        onChange={(e) =>
                          setFormData({ ...formData, mensaje: e.target.value })
                        }
                        className="w-full p-4 rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#98002e]/20 focus:border-[#98002e] transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* Mensajes de feedback dinámicos */}
                    {status !== "idle" && (
                      <div
                        className={`p-4 rounded-md text-sm font-medium transition-all ${
                          status === "loading"
                            ? "bg-neutral-100 text-neutral-600"
                            : status === "success"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {feedbackMessage}
                      </div>
                    )}

                    {/* Botón de Envío */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!isFormValid || status === "loading"}
                        className={`group relative inline-flex w-full h-12 items-center justify-center rounded-md overflow-hidden transition-all duration-300 ${
                          !isFormValid || status === "loading"
                            ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                            : "border border-neutral-300 shadow-sm hover:border-transparent hover:shadow-md cursor-pointer"
                        }`}
                      >
                        {isFormValid && status !== "loading" && (
                          <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        )}
                        <span
                          className={`relative z-10 px-6 font-medium transition-colors duration-300 ${
                            !isFormValid || status === "loading"
                              ? "text-neutral-500"
                              : "text-neutral-900 group-hover:text-white"
                          }`}
                        >
                          {status === "loading"
                            ? "Enviando..."
                            : "Enviar mensaje"}
                        </span>
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
