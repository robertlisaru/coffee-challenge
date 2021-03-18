import DataStates from './DataStates'

class StatefulData {
    dataState = DataStates.LOADING
    data = null
    error = null

    setData(data) {
        if (!data || data.length == 0) {
            this.dataState = DataStates.EMPTY
        }
        else this.dataState = DataStates.AVAILABLE

        this.data = data
    }

    setError(error) {
        this.dataState = DataStates.ERROR
        this.error = error
    }
}

export default StatefulData
