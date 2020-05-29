export enum DownloadableDataActionsType {
    'GET_DOWNLOADABLE_DATA'='GET_DOWNLOADABLE_DATA',
}

export type DownloadableDataActions =
    ReturnType<typeof _startLoading>

const _startLoading = () => {
    return {
        type: DownloadableDataActionsType.GET_DOWNLOADABLE_DATA as typeof DownloadableDataActionsType.GET_DOWNLOADABLE_DATA,
    }
};

export const getDownloadableData = () => {
    return (dispatch: any, getState: any) => {
        console.log(getState());
        dispatch(_startLoading());
        return Promise.resolve(dispatch(_startLoading()))
    }
};

