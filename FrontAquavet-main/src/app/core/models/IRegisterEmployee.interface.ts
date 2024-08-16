export interface IRegisterEmployee {
    iD_Empleado?:      number;
    primer_Nombre?:    string | null;
    segundo_Nombre?:   string | null;
    otro_Nombre?:      string | null;
    primer_Apellido?:  string  | null;
    segundo_Apellido?: string | null;
    telefono?:          string | null;
    email?:             string | null;
    fecha_Nacimiento:   Date;
    genero?:             string | null;
    direccion?:          string | null;
    fecha_Contratacion: Date;
    salario:            number;
    iD_Puesto:          number;
    iD_EstadoEmpleado: number;
}