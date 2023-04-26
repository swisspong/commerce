import Image from 'next/image'
import { Inter } from 'next/font/google'

export default function Sidebar() {
  return (
    <div>
      <aside className="sidebar">

        <div className="nametopic">
          <h1 className="text-topic-1">Krut</h1>
          <h1 className="text-topic-2">yak</h1>
          <h1 className="text-topic-3">.js</h1>

        <div className="nametopic-lighting">
          <h1 className="text-topic-1">Krut</h1>
          <h1 className="text-topic-2">yak</h1>
          <h1 className="text-topic-3">.js</h1>
        </div>
        </div>

        <div className="box-name-store">
            <img className="img-name-store" src='./img/preeTon.jpg'></img>
            
            <div className="name-store-and-hashtag">
                <p className="name-store">Phasit Store</p>
                <p className="hashtag-store">#696969</p>
            </div>
          
        </div>

      </aside>
    </div>
   
  )
}
