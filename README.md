# MC-CUSTODIA (Modulo de Comisiones Custodia) - Frontend

...

...

## Docs

- [Figma](https://www.figma.com/proto/2K9htGvRlAp0DNhFJewSim/Facturaci%C3%B3n-de-Custodia?type=design&node-id=131-4967&t=Sg21FAaBFesXbbjX-1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=131%3A4967&mode=design)
- [Figma Desarrolladores]()

## Arquitectura Limpia

- @core: Contiene toda la configuración de la aplicación, por ejemplo, el tema, el contexto, el store, etc.
- bundle: Contiene todas las entidades agrupadas por módulo, por ejemplo, el módulo de facturación, el módulo de custodia, etc.
  - components: Contiene todos los componentes de la aplicación, por ejemplo, tabla, paginación, etc.
  - data: Contiene la integracion con servicios externos. Por ejemplo, con el backend, mock, etc. 
  - domain: Contiene toda la lógica de negocio de la aplicación. Tipado de datos, validaciones, constantes, etc.
- pages: Contiene las páginas de la aplicación. Se encarga utilizar los componentes del bundle y de integrarlos con el contexto y el store.

## Contribution guidelines

- Aplicar guia de estilos de eslint.

## Libs

- [Template MUI utilizado](https://mui.com/store/previews/materio-mui-react-nextjs-admin-template/)
- [MUI](https://mui.com/)
- [Iconos MUI](https://mui.com/material-ui/material-icons)
- [Iconos Material Design](https://materialdesignicons.com/)

## Notes

- La aplicación es de tipo MPA (Multi Page Application) desarrollada en Next.js y React.js.

## Maintainers

- [Célula DEV-Custodia](mailto:)

## Authors

- [Célula DEV-Custodia](mailto:)
