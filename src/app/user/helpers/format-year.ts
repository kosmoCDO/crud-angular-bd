export function formatDate( date : Date ): string {

    const fechaNueva = new Date( date );

    return fechaNueva.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
}