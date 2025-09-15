import profile from "/src/dp.png";
import "./About.css";

function About() {
    return (
        <div id="about">
            <img src={profile} alt=""/>
            <div id="about-para">
                <p>I’m <span>Naga Sai Kiran</span>, a Computer Science and Engineering student passionate about full-stack web development and software engineering. I specialize in the MERN stack and enjoy building real-world applications that solve meaningful problems. I'm focused on growing my skills and aiming for roles at top tech companies, combining technical knowledge with a drive for continuous learning and innovation.</p>
            </div>
        </div>
    )
}

export default About;