import * as React from 'react'
import  loadable from 'react-loadable'

const Loading = () => {
    return <div>loading...</div>
  }
export default function ImportDynamic(loader:any){
    return loadable(
        {
            loading:Loading,
            loader
        }
    )
}