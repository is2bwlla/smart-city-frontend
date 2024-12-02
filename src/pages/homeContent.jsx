import Forms from "../assets/forms.png";
import Grafico from "../assets/grafico.png"

const Content = () => {
    return (
        <>
            <div className="flex justify-around items-center">
                <div className="max-w-lg flex justify-between">
                    <p className="text-xl text-black text-justify">O  Smart City API Sensors está focado na criação de uma solução inteligente para monitoramento interno da Instituição SENAI "Roberto Mange". Ele usa sensores distribuídos em áreas estratégicas para coletar dados em tempo real. Esses dados podem incluir informações como luminosidade, umidade, e temperatura, todos esses dados estarão em uma API desenvolvida em Django Rest Framework.</p>
                </div>
                
                <div>
                    <img src={Forms} alt="Formulário 3D" />
                </div>
            </div>

            <div className="flex justify-around items-center">
                <div>
                    <img src={Grafico} alt="Formulário 3D" />
                </div>

                <div className="max-w-lg flex justify-between">
                    <p className="text-xl text-black text-justify">A API do projeto é projetada para receber, processar e armazenar essas informações, permitindo que docentes, funcionários no geral e até mesmo os alunos visualizem os dados coletados e os usem para tomada de decisões. Essa abordagem promove uma gestão mais eficiente e sustentável, ajudando a identificar rapidamente problemas como gasto de energia, áreas de risco ou situações que exijam manutenção. </p>
                </div>
            </div>
        </>
    );
};

export default Content;