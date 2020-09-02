import {createElement} from 'react'
import {render} from 'react-dom'
import LinearProgress from '@material-ui/core/LinearProgress';

let progressEL = document.getElementById('progress')
render(createElement(LinearProgress),progressEL)
hiddenProgress()

export function showProgress() {
    progressEL.style.display = 'block'
}
export function hiddenProgress() {
    progressEL.style.display = 'none'
}

