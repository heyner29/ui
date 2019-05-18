const DataImportIndex = () => import('@core-pages/dataImport/Index.vue');

export default {
    name: 'import.index',
    path: '/import',
    component: DataImportIndex,
    meta: {
        breadcrumb: 'data import',
        title: 'Data Import',
    },
};
