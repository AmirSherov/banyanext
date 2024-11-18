'use client';
import './about.scss';
import { useState } from 'react';
export default function About() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="about-container">
      <section className="intro-section">
        <h1 className="page-title">О нас</h1>
        <p className="intro-text">
          Мы — команда профессионалов, которая создает уникальные бани для вашего отдыха и здоровья.
        </p>
      </section>

      <section className="team-section">
        <h2 className="section-title">Наша команда</h2>
        <div className="team-members">
          <div
            className="team-member"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVEhUWFxUVFRIWFRUVFxgVGBcWFhUVFxYYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8NFSsZFRkrKy0tLSsrKysrKy0rKy0rKy0rKzc3LSsrKy03LS0rKysrKysrKystLSsrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABAECBQMGB//EADYQAAIBAgQFAAkDAwUBAAAAAAABAgMRBBIhMQVBUWFxBhMigZGhscHwMkLRFFLhFSMzsvFi/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/APBkASiIgnKWjEtYqq5SrOhFgOZISRBESBBE5pK7dkuYFik6iju0vJl4nibelP2V/c9/cuRnzjfVu7fN6+SjefEqS/ffwmzhV4xH9kW+70RkOnb6e87qMUlrf7sKep8Um/2x+Zd8Tmn+iL8XuLU7W7218vZfnRnejSWVzey0Xf8AwENUuJRe6cfmvihulUUv0u5iWfNb2tFfK/5qUpycGnHfpv8AiCvSJEilDHxlv7L77fEcSAEiQLKIBFFwAAAEWsBCRNiQIIsBIAZJeKCJYoAAAAAAAKuJYAObRmcReZ5eS+DZoYutlXVvRLuN4Lh2WN56t6u/IDyip8uzX8EOi+Vz0uJw8U9kL5UBixwsmd4cNkbEI9BinHkgMulw921LV4O1n8Dep0rblK1BMDzs4vdNLu9/checbc2/CaXvb3HMYsr/AJQnOpr+lP3ICIZpc/FtDU4bi2mqc79It/Qz41X0a9yOUsS1vfTbkEerijocMDXVSEZrnv52f0O4UAibFgIRJBZIggC6RJRzA6ABkpEgAAAE2AgC1iGgIAmwNATw/C+squT2p/8AZmljJ5dP86luBrLQctnUnJ37JuP2E+KVUppLS6TX0+wCGJnd82LqWo/Xo2htruzOVRAdo1R7CPruZbxSR3w2MvbZ9gjYjJhX0TZzpVE9vgMK0lZq4Vi4qjdPvqZLhZ3sz0mLwUlrDVc+tjJrRf5+ahCTrvrfyvuc5p8+fvRevE4qVtArc4A/ZlHo728mqkYHAp/7lt7xfys0ehAAAtFEBFFgAoAAAAAADKCwFgISLABEBBIAQDJF69a3LRbgenWSnRhB6NR59d9PezzuPrKUYzWrg2n40ZkYvi05t393OyWgzwGMqs3B7WlJX62exVc8XxBu7b0ly5GZWqye2nY3aXCc0c3TWxjcRVpNdOQFKFJvdjtHCR/vMmKm7WuPUMJpvZ99dQjYoUZRejuu+5rU5t7qzPP4aU46OWZb21/EbmDm5LVq/UKeou6MfjOFSeZLc06K+By4rG8QPLPV6u/5zF6y7DdKjJu1rs0cNwOVRqL2205vogM/gP8Ayrw/oemRl4HCqNaX7WotZHvy1XVGvGIExRIAAABZICLE5SQIAAAIyEWKosAAAAAAAAQvVxvOazWV1Hq1fQkmnC7SavdpNdnv8gPM47EOd5qFle1klo3ey+THfR+LjKVW+sI2jy9ud4/JZvkN8So04QUKS15t2u9/h/g6YHC5Ixhzbzy8taL3JL4sqtPBN5DzvF8I23L5HqsNBJdDL404JXjr1A8zBNcxqjCTOcbDmHkEPYTCmlTw76i+Eqqw560K6xSRTGSWW5SXW4nxOs0rbPl8wOfDreuXhmxiakFZKcYSWq1s+l/kYXo5TvNt9NDV4jw/PTUnq4pJNffsAtjpXlCpdNqVpSXR6X8XsPHmsJWn6xU+WqfjmelAAJLAQkTYAIgAAAAAArJRJBIQAAAAWBI6FVzNX0cwfrKrurqMZO3fZLtuZxr+i2PVGvFy/TJOD9+z+ICWIwcI1450knNKy87ITcmq0sytr+WL+neZVrxbyqV4tdd1YWoJNrNdyyty9rRT6rpy7agdsXjqPKM6nVRu14vsVxuJpOmsscknplluu5h1sXUeZZv0u3YT9bNvdtgdq1O2zGcDWi9Ho+/MScnbVM46p80B6eVF5br4Bhsesupx4LjHOnJSesdU+3Qy/WtTdubehEeiWLWmzX056/P4CGIquba3td/+CdKtfTl459LjlJezpa900+n+Cqng08tWy2aa+RuYuVTOoxdoWScr62/dpye55ujJRnm7/c9JSjLLmau3ze3w5gJ0cGoybjG13dyera6dkOlabbV3u9S6AEWACIAAIoASOmVEpAVRYgMyAqsYLAWijLKEiGjoBVViiwAgAhkgAcdqeshSlf8ATmb87fY44fCN088pWzK1uduy+AjxCTSlDxKP0a+KTOvo3Rq1pwnUtOlTlZ03f2lZ3S8XTCEVQtNqKer05mlDhtX2rwSypSafS1/obHHOKwbjlpqnkhGmrc8mie3Yx62Iq1OfK17206fMKnG0pUlrOGsVK1tXfQ83ipTbvI2KsVHVvM1yMjF1c0gHcB7NNtPViE6l5MZpS9j8+IklrcI1MPa13ppdLr5+Y3Cu3pb3pfnQy1L3mnw6Nmm/z7gdJUE4tLzbn5+Ru4KrmorxYx68787aPnf4mjwfWl4bV+oUxBaI6IrDYsRATFEI6pFiq5SUSBVAAAAAABiHUrEsRAgAAAAAAAAQCOMpf7kHrreL+H8jfo/xOVGCjGEZSvJq+qWyvYvGjma7amZhJqE7Pk79bAV4zxCebVJO99FpqZ8cZNrfQa4vJOTceeplylyAvUqt7s4yepKaCnHUIYpNZdhZPoOJ+xa3v/PzQRW4U3B9V+dR3D1HHVcuf2EFK349On0OtLNJ5Yq/YBurib9L9j0nCqTjSSejerRncL4PZqU9Xvbv5N7QDhEsRzJiQXgiWSBpQAAAAAAAAAGQiSESRAAAkAAWsQ0BBYhIkg64OOr6ZXd/x3MDiEGpN9VyWnY3qFTK79mjN4lV5pK23X3dn/JRhV5O93/AtJs74mWu5CsgKU6TfIap4d72dvG3XwRCdtTo6+j7p6fRhFMROysJxT5a/wDh0qScnZG3w/h6iryV5fTsArgOEOWs3bsegwWFhTWiS7laTR0bu9Ap6D6F2cKDGYoBeW5eBzxCsWoSurgdAACqAAAAAAAAAAyQACIEiyIRYAIsSBEAAQwJM/iSesrac7fI0CGgPI1+pzVR/n55PUPhtJ/tt40HeC8FoOtGMoZk77+GVXilfkdI0ZPsfRuL+jVKzyxydLLRHjMThVFta6AduHYWKV931NeFMzcFoa1OL/yBzcDpGyKyfX4Ex1A7Q3+w5CWgvCB2gBWsrozs7g3b4GnN2M7EpagMUsXF87Pud4yT2ZiRZDnbZ294G6Bjwxs1zv51GKXE1+5W8alVoAc6VeMtmn25/A6AAAAGSAARExLEIkiAAAAIZIAAATFAWSG+GStWpv8A+kKl6M7ST6NP4Mqva4hXXc+e+kVK0r92fQMXL7nl+PYVSWa3lrmB5vCzNbD1NNDChpKxqUKoFZT9pjVEz3LUfw7AfiXatqcW9DpF3VgLzV0J1KY3GfI41dAMvGRUdhSNS41jtTGqzcQH3VITEI1jtCoQNJ9BqhxCcd/aXff4maqh0jIo1/8AVY/2y+KAy83cAHwSAsgAkAIgAAAAAAAukUSHKGDb1ei+ZVcIq+w7g8DdrNohinRUdkRVxSjouqA3MZrH3GHWlmjlZv4leyvB5nGxy69LpgeZx9LLJtHSnPQvxLVtmfmewDdKV2adEycMrM172VwjrUq7I7Uqhl1K2p1/qUgrRc7anKvO4jLGIo8T3AriTGxSuzQqVkI1pIIUzHSEwykxp9ERXWEztGoL+rl0ZZprkUNAK+t7Egb1ixBJEAAQBIASkBAF1E0sBhFH2p2vyj07vuBXB4KyzS35LoWq4leDvjK1loZWJV/aKqa+NFaEpVKkUuuoVcr0VhzhqjFp9APY1Y3p26JGPjKOZPuvmM/6pBRSb3O1PLLK0+v0A+dcQbjNp8ha92anpJhnGq3/AHaoR4TRz1FHfUDvWp5XHTlqxqVZZRv0lpqMowirtLXyZrwMmvaeXsBnVcRqWjOctEn5GlThDld9Xqd1iE1bYDP/AKefNpF1Q6tnScznmAj1K8kqiuhVzD1jAYhSQxCmhWnMt61kDFRJdDIxuI1sdsTXYhGk5Mor6xgM/wBGAHoEWKo60qEpbL38iCgDf9Fbd+5ErDroUcKVNs7NQjv7T+RaorbaISr26gTVx1ttPAvHFycv1MVrROEU76AekpwlNqKdxnFYdL2VsL8Nn6uN3+plo4rM7MBWphVyFqlC2rNOpUSEq8ne/wBQEZQlK2rSRqUeKShHK5X6Mza1cSnJtgbnHairU1NbrcX9HKWR+sa2OWFrrLlZo0dI6bAOU4RnJ1Z7vZCHEVrp8jhicTdaaCEqzu9QKVlb81FlcYlUTRWNICqRKgdo0yzgAsoF8h1cTnLT+Qiyt0KSkVciGgOclc60KZRIZgFXyICCQHEeho/pXgAAXq7lGAAccRsZtYgAFKh0wW6AANSr9haP6l5YAA1P+DhigADLxPPwceSJAII7o3qf/H7gADNf3FcSQAHKO43QAArsyi3IAC3IXkAAco7slgBaiI7ncAMiQAAP/9k="
              alt="Команда 1"
              className="team-member-img"
            />
            <div className={`member-info ${hovered ? 'hovered' : ''}`}>
              <h3>Amir Sherov</h3>
              <p>Основатель</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mission-section">
        <h2 className="section-title">Наша миссия</h2>
        <p className="mission-text">
          Мы стремимся создавать бани, которые дарят не только комфорт, но и уникальную атмосферу.
        </p>
        <div className="cube-loader">
          <div className="cube-top"></div>
          <div className="cube-wrapper">
            <span className="cube-span" style={{ '--i': 0 }}>
              <div className="text-container">Frontend</div>
            </span>
            <span className="cube-span" style={{ '--i': 1 }}>
              <div className="text-container">Backend</div>
            </span>
            <span className="cube-span" style={{ '--i': 2 }}>
              <div className="text-container">Fullstack</div>
            </span>
            <span className="cube-span" style={{ '--i': 3 }}>
              <div className="text-container">Mobile</div>
            </span>
          </div>
        </div>

      </section>

      <section className="testimonials-section">
        <h2 className="section-title">Отзывы наших клиентов</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p className="testimonial-text">"Это было потрясающе! Бани — просто великолепны."</p>
            <p className="client-name">Анна П.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Отличный сервис и невероятный комфорт!"</p>
            <p className="client-name">Максим В.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2 className="section-title">Свяжитесь с нами</h2>
        <p className="contact-text">
          Если у вас есть вопросы, не стесняйтесь обращаться к нам через форму или по телефону.
        </p>
      </section>
      <section className='logos-section'>
        <a href="/">
        <div className="light-button">
          <button className="bt">
            <div className="light-holder">
              <div className="dot"></div>
              <div className="light"></div>
            </div>
            <div className="button-holder">
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
                <path
                  d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                ></path>
              </svg>
              <p>Discord</p>
            </div>
          </button>
        </div>
        </a>
        <a href="https://t.me/smile_zxc">
        <div className="light-button">
          <button className="bt">
            <div className="light-holder">
              <div className="dot"></div>
              <div className="light"></div>
            </div>
            <div className="button-holder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
                <path d="M19.039,5.267c0.32,0.334,0.51,0.765,0.51,1.222v11.244c0,0.458-0.19,0.888-0.51,1.222l-9.712-4.961l-3.9,2.261c-0.27,0.158-0.594,0.204-0.899,0.129c-0.305-0.074-0.56-0.25-0.731-0.495c-0.177-0.266-0.248-0.594-0.204-0.91l0.56-3.74l-4.48-2.442c-0.293-0.163-0.492-0.437-0.546-0.744c-0.054-0.307,0.07-0.625,0.294-0.812l9.51-5.61c0.258-0.154,0.572-0.184,0.847-0.08c0.275,0.103,0.493,0.312,0.612,0.568l3.849,7.107l5.91-3.318c0.298-0.166,0.52-0.449,0.593-0.772c0.073-0.324-0.067-0.655-0.322-0.858L19.039,5.267z" />
              </svg>
              <p>Telegram</p>
            </div>
          </button>
        </div>
        </a>
       <a href="https://github.com/AmirSherov">
       <div className="light-button">
          <button className="bt">
            <div className="light-holder">
              <div className="dot"></div>
              <div className="light"></div>
            </div>
            <div className="button-holder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.799 8.207 11.385.6.111.828-.26.828-.577 0-.286-.011-1.045-.017-2.05-3.338.727-4.042-1.604-4.042-1.604-.547-1.38-1.338-1.744-1.338-1.744-1.091-.746.082-.732.082-.732 1.208.084 1.842 1.24 1.842 1.24 1.07 1.83 2.805 1.302 3.493.996.107-.777.418-1.303.76-1.603-2.667-.303-5.434-1.334-5.434-5.927 0-1.308.469-2.379 1.236-3.221-.124-.303-.535-1.52.114-3.165 0 0 1.008-.323 3.295 1.23 1.246-.347 2.587-.52 3.903-.527 1.318.007 2.662.18 3.906.527 2.29-1.55 3.293-1.23 3.293-1.23.656 1.645.238 2.862.114 3.165.77.842 1.236 1.913 1.236 3.221 0 4.604-2.769 5.624-5.437 5.926.425.366.803.96.803 1.92 0 1.388-.013 2.505-.013 2.84 0 .317.225.69.832.574 4.768-1.587 8.207-6.082 8.207-11.384 0-6.627-5.373-12-12-12z"></path>
              </svg>
              <p>GitHub</p>
            </div>
          </button>
        </div>
       </a>
      </section>
    </div>
  );
}
