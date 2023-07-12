import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

function App() {
   const [file, setFile] = useState(null);
   const [text, setText] = useState([]);
   const { seconds, start, pause, reset } = useStopwatch();
   const [loading, setLoading] = useState({
      isUploading: false,
      isDone: false,
   });

   const handleSubmit = async (event) => {
      event.preventDefault();
      reset();
      const data = new FormData();
      data.append("file", file);
      setLoading({
         isUploading: true,
         isDone: false,
      });

      const res = await axios.post(
         " https://jbwonxigfy.us19.qoddiapp.com/upload",
         data,
         {
            timeout: 0,
         }
      );
      if (res.status !== 200) {
         alert("파일 업로드에 실패했습니다.");
         return;
      }

      setText(JSON.parse(res.data));

      // setText(res.data);
      setLoading({
         isUploading: false,
         isDone: true,
      });
      pause();
   };

   const handleChange = (event) => {
      setFile(event.target.files[0]);
   };

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
         }}
      >
         <form
            onSubmit={handleSubmit}
            style={{
               backgroundColor: "#f0f0f0",
               padding: "1rem",
               borderRadius: "1rem",
            }}
         >
            <input type="file" onChange={handleChange} />
            <input
               type="submit"
               style={{
                  border: "none",
                  padding: "0.5rem 1rem",
                  ":hover": {
                     cursor: "pointer",
                     backgroundColor: "#e0e0e0",
                  },
               }}
            />
         </form>
         <span>
            인식된 텍스트: <br />
            <br />
            {loading.isUploading && !loading.isDone ? (
               <ScaleLoader />
            ) : (
               text.map((t) => (
                  <div
                     style={{
                        display: "flex",
                     }}
                  >
                     <div
                        style={{
                           marginRight: "1rem",
                        }}
                     >
                        타임스탬프: {t.start} - {t.end}
                     </div>
                     {t.text}
                  </div>
               ))
            )}
            {seconds} seconds
         </span>
      </div>
   );
}

export default App;
