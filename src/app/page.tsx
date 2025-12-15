'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Universidades e instituciones
const INSTITUCIONES = [
  { id: 1, nombre: 'Universidad de Chile', tipo: 'Universidad Estatal', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 7, gratuidad: true, carreras: 72, ranking: 1 },
  { id: 2, nombre: 'Pontificia Universidad Catolica de Chile', tipo: 'Universidad Privada CRUCH', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 7, gratuidad: true, carreras: 65, ranking: 2 },
  { id: 3, nombre: 'Universidad de Concepcion', tipo: 'Universidad Privada CRUCH', ciudad: 'Concepcion', region: 'Biobio', acreditacion: 7, gratuidad: true, carreras: 58, ranking: 3 },
  { id: 4, nombre: 'Universidad de Santiago de Chile', tipo: 'Universidad Estatal', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 7, gratuidad: true, carreras: 52, ranking: 4 },
  { id: 5, nombre: 'Universidad Tecnica Federico Santa Maria', tipo: 'Universidad Privada CRUCH', ciudad: 'Valparaiso', region: 'Valparaiso', acreditacion: 6, gratuidad: true, carreras: 38, ranking: 5 },
  { id: 6, nombre: 'Universidad Austral de Chile', tipo: 'Universidad Privada CRUCH', ciudad: 'Valdivia', region: 'Los Rios', acreditacion: 6, gratuidad: true, carreras: 48, ranking: 6 },
  { id: 7, nombre: 'Universidad Catolica de Valparaiso', tipo: 'Universidad Privada CRUCH', ciudad: 'Valparaiso', region: 'Valparaiso', acreditacion: 6, gratuidad: true, carreras: 42, ranking: 7 },
  { id: 8, nombre: 'Universidad de Talca', tipo: 'Universidad Estatal', ciudad: 'Talca', region: 'Maule', acreditacion: 5, gratuidad: true, carreras: 35, ranking: 8 },
  { id: 9, nombre: 'Universidad de La Frontera', tipo: 'Universidad Estatal', ciudad: 'Temuco', region: 'La Araucania', acreditacion: 5, gratuidad: true, carreras: 32, ranking: 9 },
  { id: 10, nombre: 'Universidad de Valparaiso', tipo: 'Universidad Estatal', ciudad: 'Valparaiso', region: 'Valparaiso', acreditacion: 5, gratuidad: true, carreras: 45, ranking: 10 },
  { id: 11, nombre: 'Universidad Adolfo Ibanez', tipo: 'Universidad Privada', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 6, gratuidad: false, carreras: 28, ranking: 11 },
  { id: 12, nombre: 'Universidad Diego Portales', tipo: 'Universidad Privada', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 6, gratuidad: true, carreras: 35, ranking: 12 },
  { id: 13, nombre: 'Universidad de los Andes', tipo: 'Universidad Privada', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 6, gratuidad: false, carreras: 25, ranking: 13 },
  { id: 14, nombre: 'Universidad Alberto Hurtado', tipo: 'Universidad Privada', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 5, gratuidad: true, carreras: 22, ranking: 14 },
  { id: 15, nombre: 'DUOC UC', tipo: 'Instituto Profesional', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 6, gratuidad: true, carreras: 85, ranking: 1 },
  { id: 16, nombre: 'INACAP', tipo: 'Instituto Profesional', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 5, gratuidad: true, carreras: 92, ranking: 2 },
  { id: 17, nombre: 'Instituto Profesional AIEP', tipo: 'Instituto Profesional', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 4, gratuidad: true, carreras: 45, ranking: 3 },
  { id: 18, nombre: 'CFT Santo Tomas', tipo: 'Centro de Formacion Tecnica', ciudad: 'Santiago', region: 'Metropolitana', acreditacion: 4, gratuidad: true, carreras: 35, ranking: 1 },
];

// Becas disponibles
const BECAS = [
  { nombre: 'Gratuidad', cobertura: 100, requisitos: '60% mas vulnerable, institucion adscrita', arancel: true, matricula: true, manutencion: false },
  { nombre: 'Beca Bicentenario', cobertura: 100, requisitos: 'Puntaje 500+ PAES, 60% mas vulnerable', arancel: true, matricula: true, manutencion: false },
  { nombre: 'Beca Juan Gomez Millas', cobertura: 100, requisitos: 'Puntaje 500+ PAES, 70% mas vulnerable', arancel: true, matricula: true, manutencion: false },
  { nombre: 'Beca Nuevo Milenio', cobertura: 100, requisitos: 'IP/CFT acreditados, 70% mas vulnerable', arancel: true, matricula: true, manutencion: false },
  { nombre: 'Beca Excelencia Academica', cobertura: 100, requisitos: 'Top 10% NEM de tu colegio', arancel: true, matricula: true, manutencion: false },
  { nombre: 'Beca Vocacion de Profesor', cobertura: 100, requisitos: 'Pedagogia, puntaje 600+ PAES', arancel: true, matricula: true, manutencion: true },
  { nombre: 'Beca Hijo de Profesional', cobertura: 50, requisitos: 'Padres con titulo profesional', arancel: true, matricula: false, manutencion: false },
  { nombre: 'Beca Indigena', cobertura: 100, requisitos: 'Acreditar origen indigena, 60% vulnerable', arancel: true, matricula: true, manutencion: true },
];

// Creditos
const CREDITOS = [
  { nombre: 'CAE', tasa: 2, plazo: 20, descripcion: 'Credito con Aval del Estado, institucion acreditada' },
  { nombre: 'Fondo Solidario', tasa: 2, plazo: 15, descripcion: 'Solo universidades CRUCH, 80% mas vulnerable' },
];

// Beneficios estudiantiles
const BENEFICIOS = [
  { nombre: 'TNE', descripcion: 'Tarjeta Nacional Estudiantil - Pasaje rebajado', monto: 'Rebaja transporte', requisito: 'Alumno regular' },
  { nombre: 'BAES', descripcion: 'Beca Alimentacion Educacion Superior', monto: '$39.000/mes', requisito: '60% mas vulnerable' },
  { nombre: 'Beca Manutencion', descripcion: 'Apoyo mensual para gastos de estudio', monto: '$26.000/mes', requisito: '60% mas vulnerable' },
  { nombre: 'Beca Residencia', descripcion: 'Alojamiento para estudiantes de regiones', monto: 'Variable', requisito: 'Estudiante fuera de region' },
  { nombre: 'Seguro Escolar', descripcion: 'Cobertura accidentes en trayecto y establecimiento', monto: 'Gratuito', requisito: 'Matricula vigente' },
  { nombre: 'FONASA A', descripcion: 'Salud gratuita para estudiantes', monto: 'Gratuito', requisito: 'Sin prevision' },
];

// Proceso PAES
const PROCESO_ADMISION = [
  { etapa: 1, titulo: 'Inscripcion PAES', descripcion: 'Registro en demre.cl con RUT y clave unica', fecha: 'Junio-Agosto', costo: '$33.500' },
  { etapa: 2, titulo: 'Rendicion PAES', descripcion: 'Pruebas de Competencia Lectora, Matematica y optativas', fecha: 'Noviembre-Diciembre', costo: 'Incluido' },
  { etapa: 3, titulo: 'Resultados PAES', descripcion: 'Publicacion de puntajes en demre.cl', fecha: 'Diciembre', costo: 'Gratuito' },
  { etapa: 4, titulo: 'Postulacion', descripcion: 'Seleccion de hasta 10 carreras en orden de preferencia', fecha: 'Enero', costo: 'Gratuito' },
  { etapa: 5, titulo: 'Resultados', descripcion: 'Publicacion de seleccionados', fecha: 'Enero', costo: 'Gratuito' },
  { etapa: 6, titulo: 'Matricula', descripcion: 'Proceso de matricula en institucion asignada', fecha: 'Enero-Febrero', costo: 'Variable' },
];

// Ponderaciones tipicas
const PONDERACIONES = {
  nem: { min: 10, max: 40 },
  ranking: { min: 10, max: 40 },
  lectora: { min: 10, max: 35 },
  matematica: { min: 10, max: 50 },
  historia: { min: 0, max: 20 },
  ciencias: { min: 0, max: 25 },
};

// Glosario educativo
const GLOSARIO = [
  { termino: 'PAES', definicion: 'Prueba de Acceso a la Educacion Superior, reemplazo de la PSU desde 2022' },
  { termino: 'NEM', definicion: 'Notas de Ensenanza Media, promedio de notas de 1ro a 4to medio' },
  { termino: 'Ranking', definicion: 'Posicion relativa del estudiante respecto a generaciones anteriores de su colegio' },
  { termino: 'CRUCH', definicion: 'Consejo de Rectores de las Universidades Chilenas, 30 universidades tradicionales' },
  { termino: 'DEMRE', definicion: 'Departamento de Evaluacion, Medicion y Registro Educacional' },
  { termino: 'Gratuidad', definicion: 'Beneficio que cubre arancel y matricula para el 60% mas vulnerable' },
  { termino: 'CAE', definicion: 'Credito con Aval del Estado, tasa fija 2% anual' },
  { termino: 'FUAS', definicion: 'Formulario Unico de Acreditacion Socioeconomica para postular a beneficios' },
  { termino: 'TNE', definicion: 'Tarjeta Nacional Estudiantil para rebaja en transporte publico' },
  { termino: 'Acreditacion', definicion: 'Certificacion de calidad de instituciones de educacion superior (1-7 anos)' },
  { termino: 'CFT', definicion: 'Centro de Formacion Tecnica, carreras tecnicas de nivel superior' },
  { termino: 'IP', definicion: 'Instituto Profesional, carreras tecnicas y profesionales sin licenciatura' },
];

export default function EducacionChile() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora
  const [arancelAnual, setArancelAnual] = useState('4500000');
  const [duracionCarrera, setDuracionCarrera] = useState('5');
  const [tieneGratuidad, setTieneGratuidad] = useState(false);
  const [tieneBeca, setTieneBeca] = useState('ninguna');
  const [tieneCredito, setTieneCredito] = useState('ninguno');

  const tiposUnicos = ['Todos', ...new Set(INSTITUCIONES.map(i => i.tipo))];

  const institucionesFiltradas = INSTITUCIONES.filter(inst => {
    const cumpleBusqueda = inst.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          inst.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
                          inst.region.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleTipo = filtroTipo === 'Todos' || inst.tipo === filtroTipo;
    return cumpleBusqueda && cumpleTipo;
  });

  const calcularFinanciamiento = () => {
    const arancel = parseFloat(arancelAnual) || 0;
    const anos = parseInt(duracionCarrera) || 5;
    const costoTotal = arancel * anos;

    let cubierto = 0;
    let fuenteCobertura = '';

    if (tieneGratuidad) {
      cubierto = costoTotal;
      fuenteCobertura = 'Gratuidad (100%)';
    } else if (tieneBeca !== 'ninguna') {
      const beca = BECAS.find(b => b.nombre === tieneBeca);
      if (beca) {
        cubierto = costoTotal * (beca.cobertura / 100);
        fuenteCobertura = `${beca.nombre} (${beca.cobertura}%)`;
      }
    }

    const restante = costoTotal - cubierto;

    let cuotaMensualCAE = 0;
    if (tieneCredito === 'CAE' && restante > 0) {
      // Formula simplificada CAE: 20 anos, 2% anual
      const tasaMensual = 0.02 / 12;
      const numCuotas = 20 * 12;
      cuotaMensualCAE = (restante * tasaMensual * Math.pow(1 + tasaMensual, numCuotas)) / (Math.pow(1 + tasaMensual, numCuotas) - 1);
    }

    return { costoTotal, cubierto, restante, fuenteCobertura, cuotaMensualCAE };
  };

  const financiamiento = calcularFinanciamiento();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🎓</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Educacion Superior Chile
            </h1>
            <p className="text-blue-100">
              Universidades, becas, creditos y proceso de admision
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="bg-slate-800/50 backdrop-blur sticky top-0 z-40 border-b border-blue-500/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: 'buscador', icon: '🔍', label: 'Instituciones' },
              { id: 'becas', icon: '🎁', label: 'Becas' },
              { id: 'calculadora', icon: '🧮', label: 'Financiamiento' },
              { id: 'admision', icon: '📝', label: 'Admision' },
              { id: 'beneficios', icon: '💳', label: 'Beneficios' },
              { id: 'glosario', icon: '📖', label: 'Glosario' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeccionActiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Instituciones */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6 border border-blue-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Instituciones de Educacion Superior
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre, ciudad o region..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                >
                  {tiposUnicos.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <p className="text-sm text-blue-400">
                {institucionesFiltradas.length} instituciones encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {institucionesFiltradas.map((inst, i) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white text-sm">{inst.nombre}</h3>
                    {inst.gratuidad && (
                      <span className="px-2 py-1 bg-green-600/30 text-green-300 rounded text-xs">
                        Gratuidad
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-blue-400">Tipo:</span> {inst.tipo}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-blue-400">Ciudad:</span> {inst.ciudad}, {inst.region}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-blue-400">Carreras:</span> {inst.carreras}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">Acreditacion:</span>
                      <div className="flex gap-1">
                        {[...Array(7)].map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-3 h-3 rounded-full ${
                              idx < inst.acreditacion ? 'bg-blue-500' : 'bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white text-xs">{inst.acreditacion} anos</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Becas */}
        {seccionActiva === 'becas' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🎁</span> Becas de Educacion Superior
            </h2>

            <div className="space-y-4">
              {BECAS.map((beca, i) => (
                <motion.div
                  key={beca.nombre}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{beca.nombre}</h3>
                      <p className="text-gray-400 text-sm">{beca.requisitos}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-lg font-bold ${
                      beca.cobertura === 100
                        ? 'bg-green-600/30 text-green-300'
                        : 'bg-yellow-600/30 text-yellow-300'
                    }`}>
                      {beca.cobertura}%
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {beca.arancel && (
                      <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                        Cubre Arancel
                      </span>
                    )}
                    {beca.matricula && (
                      <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm">
                        Cubre Matricula
                      </span>
                    )}
                    {beca.manutencion && (
                      <span className="px-3 py-1 bg-teal-600/30 text-teal-300 rounded-full text-sm">
                        Incluye Manutencion
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {CREDITOS.map((credito) => (
                <div key={credito.nombre} className="bg-orange-900/30 rounded-xl p-5 border border-orange-500/30">
                  <h3 className="text-lg font-bold text-orange-300 mb-2">{credito.nombre}</h3>
                  <p className="text-gray-400 text-sm mb-3">{credito.descripcion}</p>
                  <div className="flex gap-4">
                    <span className="text-orange-400">Tasa: {credito.tasa}% anual</span>
                    <span className="text-orange-400">Plazo: {credito.plazo} anos</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Calculadora de Financiamiento */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🧮</span> Calculadora de Financiamiento
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Datos de la carrera</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Arancel anual ($CLP)</label>
                    <input
                      type="number"
                      value={arancelAnual}
                      onChange={(e) => setArancelAnual(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Duracion carrera (anos)</label>
                    <select
                      value={duracionCarrera}
                      onChange={(e) => setDuracionCarrera(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                    >
                      {[2, 3, 4, 5, 6, 7].map(n => (
                        <option key={n} value={n}>{n} anos</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="gratuidad"
                      checked={tieneGratuidad}
                      onChange={(e) => {
                        setTieneGratuidad(e.target.checked);
                        if (e.target.checked) setTieneBeca('ninguna');
                      }}
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-blue-500"
                    />
                    <label htmlFor="gratuidad" className="text-gray-300">
                      Tengo Gratuidad
                    </label>
                  </div>

                  {!tieneGratuidad && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Beca</label>
                      <select
                        value={tieneBeca}
                        onChange={(e) => setTieneBeca(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="ninguna">Sin beca</option>
                        {BECAS.map(b => (
                          <option key={b.nombre} value={b.nombre}>{b.nombre} ({b.cobertura}%)</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Credito (para monto restante)</label>
                    <select
                      value={tieneCredito}
                      onChange={(e) => setTieneCredito(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="ninguno">Sin credito</option>
                      <option value="CAE">CAE (2% anual, 20 anos)</option>
                      <option value="FSCU">Fondo Solidario (2% anual, 15 anos)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Resumen financiero</h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Costo total carrera</span>
                    <span className="font-bold">${financiamiento.costoTotal.toLocaleString('es-CL')}</span>
                  </div>

                  {financiamiento.fuenteCobertura && (
                    <div className="flex justify-between text-green-300">
                      <span>{financiamiento.fuenteCobertura}</span>
                      <span className="font-bold">-${financiamiento.cubierto.toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <div className="border-t border-blue-500/30 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Monto a financiar</span>
                      <span className={financiamiento.restante === 0 ? 'text-green-400' : 'text-orange-400'}>
                        ${financiamiento.restante.toLocaleString('es-CL')}
                      </span>
                    </div>
                  </div>

                  {financiamiento.cuotaMensualCAE > 0 && (
                    <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-500/30">
                      <p className="text-orange-300 text-sm mb-2">Cuota mensual CAE (estimada)</p>
                      <p className="text-2xl font-bold text-orange-400">
                        ${Math.round(financiamiento.cuotaMensualCAE).toLocaleString('es-CL')}/mes
                      </p>
                      <p className="text-xs text-orange-300/60 mt-1">Por 20 anos despues de egresar</p>
                    </div>
                  )}

                  {financiamiento.restante === 0 && (
                    <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                      <p className="text-green-300 font-medium">
                        Tu carrera esta 100% financiada
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Proceso de Admision */}
        {seccionActiva === 'admision' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📝</span> Proceso de Admision PAES
            </h2>

            <div className="relative">
              {PROCESO_ADMISION.map((etapa, i) => (
                <motion.div
                  key={etapa.etapa}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 mb-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      {etapa.etapa}
                    </div>
                    {i < PROCESO_ADMISION.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-500/30 mt-2" />
                    )}
                  </div>

                  <div className="flex-1 bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{etapa.titulo}</h3>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                          {etapa.fecha}
                        </span>
                        <span className="px-3 py-1 bg-slate-600 text-gray-300 rounded-full text-sm">
                          {etapa.costo}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400">{etapa.descripcion}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="text-lg font-bold text-white mb-4">Ponderaciones tipicas</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(PONDERACIONES).map(([key, val]) => (
                  <div key={key} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 capitalize mb-1">
                      {key === 'nem' ? 'NEM' : key === 'lectora' ? 'Competencia Lectora' : key === 'matematica' ? 'Matematica' : key}
                    </h4>
                    <p className="text-gray-300">{val.min}% - {val.max}%</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Beneficios */}
        {seccionActiva === 'beneficios' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>💳</span> Beneficios Estudiantiles
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {BENEFICIOS.map((beneficio, i) => (
                <motion.div
                  key={beneficio.nombre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{beneficio.nombre}</h3>
                    <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                      {beneficio.monto}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-2">{beneficio.descripcion}</p>
                  <p className="text-sm text-blue-400">
                    Requisito: {beneficio.requisito}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-900/30 rounded-xl p-4 border border-yellow-500/30">
              <h4 className="font-bold text-yellow-400 mb-2">Importante: FUAS</h4>
              <p className="text-yellow-200/80 text-sm">
                Para postular a la mayoria de estos beneficios debes completar el FUAS (Formulario Unico de
                Acreditacion Socioeconomica) en{' '}
                <a href="https://fuas.cl" target="_blank" className="underline hover:text-white">fuas.cl</a>
                {' '}entre octubre y noviembre de cada ano.
              </p>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario Educativo
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-blue-400 mb-2">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-blue-500/30 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-bold text-white mb-2">DEMRE</h4>
              <a href="https://demre.cl" target="_blank" className="text-blue-400 hover:underline text-sm">
                demre.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Mineduc</h4>
              <a href="https://mineduc.cl" target="_blank" className="text-blue-400 hover:underline text-sm">
                mineduc.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Portal Becas</h4>
              <a href="https://portal.beneficiosestudiantiles.cl" target="_blank" className="text-blue-400 hover:underline text-sm">
                beneficiosestudiantiles.cl
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              Parte de{' '}
              <a href="https://newcool-informada.vercel.app" className="text-blue-400 hover:underline">
                NewCooltura Informada
              </a>
              {' '}- Informacion ciudadana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
