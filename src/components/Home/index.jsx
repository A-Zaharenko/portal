import React from "react";
import "./Home.scss";
import "./Home-media.scss";
import { Link, navigate } from "@reach/router";
import ReactHtmlParser from "react-html-parser";
import classNames from "classnames";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import imgEnjoy from "../../assets/images/home/imgEnjoy.svg";
import puzzle from "../../assets/images/home/puzzle.svg";
import phoneBackground from "../../assets/images/home/phoneBackground.svg";
import phone from "../../assets/images/home/phone.svg";
import slide1 from "../../assets/images/home/slider/slide1.gif";
import slide2 from "../../assets/images/home/slider/slide2.png";
import slide3en from "../../assets/images/home/slider/3.png";
import slide4en from "../../assets/images/home/slider/4.png";
import slide3ru from "../../assets/images/home/slider/3ru.svg";
import slide4ru from "../../assets/images/home/slider/4ru.svg";
import slide3cn from "../../assets/images/home/slider/3cn.svg";
import slide4cn from "../../assets/images/home/slider/4cn.svg";
import extensionImg from "../../assets/images/home/extensionImg.png";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSectionId: undefined,
            showMobileWow: false
        };
        this.sections = {
            toGetStarted: {
                id: "to-get-started",
                text: "ourApp",
                ref: React.createRef(),
                top: undefined
            },
            howItWork: {
                id: "how-it-works",
                text: "HowItWork",
                ref: React.createRef(),
                top: undefined
            },
            source: {
                id: "learning-sources",
                text: "learningSources",
                ref: React.createRef(),
                top: undefined
            }
        };
        this.offsetSection = 70;
        this.mobileWow = React.createRef();
    }
    calcCurSelection() {
        const curPos = window.scrollY;
        let curSection = undefined;
        for (const key in this.sections) {
            if (this.sections.hasOwnProperty(key)) {
                const el = this.sections[key];
                if (curPos >= el.top) {
                    curSection = el.id;
                }
            }
        }
        if (this.state.currentSectionId !== curSection) {
            this.setState({
                currentSectionId: curSection
            });
            navigate(curSection ? "/#" + curSection : "/");
        }
    }
    calcMobileShow = () => {
        const viewPortHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
        );
        let mobileRect = this.mobileWow.current.getBoundingClientRect();
        let bottomPhoneImg =
            mobileRect.top + mobileRect.height + window.scrollY;
        if ((bottomPhoneImg < window.scrollY + viewPortHeight && !this.state.showMobileWow) ) {
            this.setState({ showMobileWow: true });
        }
    };
    handleScroll = () => {
        this.calcCurSelection();
        this.calcMobileShow();
    };
    getAnchorPoints = () => {
        const curScroll = window.scrollY;
        for (const key in this.sections) {
            if (this.sections.hasOwnProperty(key)) {
                const el = this.sections[key];
                el.top =
                    Math.round(el.ref.current.getBoundingClientRect().top) +
                    curScroll -
                    this.offsetSection;
            }
        }
        const viewPortHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
        );

        const bottom = document.body.offsetHeight;
        let sectionKeys = Object.keys(this.sections);
        let lastSection = this.sections[sectionKeys[sectionKeys.length - 1]];
        if (viewPortHeight > bottom - lastSection.top) {
            lastSection.top = bottom - viewPortHeight;
        }
        this.handleScroll();
    };
    anchorClick = (e, id) => {
        e.preventDefault();
        window.scrollTo({ top: this.sections[id].top, behavior: "smooth" });
    };
    componentDidMount() {
        window.scrollTo({ top: 0 });
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.getAnchorPoints);
        setTimeout(() => {
            this.getAnchorPoints();
        }, 500);
    }
    componentDidUpdate() {
        this.getAnchorPoints();
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.getAnchorPoints);
    }
    render() {
        const slickSettings = {
            slides_to_show: 1,
            dots: true,
            pause_on_hover: true,
            autoplay: true,
            infinite: true,
            speed: 900,
            fade: true
        };
        const slideImg = {
            slide3en,
            slide4en,
            slide3ru,
            slide4ru,
            slide3cn,
            slide4cn
        };
        const anchorLinks = Object.keys(this.sections).map((k, index) => {
            const { id, text } = this.sections[k];
            const liClass = classNames("anchor-item", {
                active: this.state.currentSectionId === id
            });
            return (
                <li className={liClass} key={index}>
                    <a
                        href={"#" + id}
                        onClick={e => {
                            this.anchorClick(e, k);
                        }}
                    >
                        <div className="anchor-item-number">{index + 1}</div>
                        <div className="anchor-item-text">
                            {this.props.text[text]}
                        </div>
                    </a>
                </li>
            );
        });
        const mobileClasses = classNames("img-phone-front", {
            show: this.state.showMobileWow
        });
        return (
            <div className="Home">
                <header className="hero">
                    <div className="wrapper-hero">
                        <div>
                            <h1 className="hero-title">
                                {this.props.text.headerTitle}
                            </h1>
                            <p className="subtitle">
                                {this.props.text.headerSubtitle}
                            </p>
                        </div>

                        <div className="button-started">
                            <a
                                className="get-started-button"
                                href="#toGetStarted"
                                onClick={e => {
                                    this.anchorClick(e, "toGetStarted");
                                }}
                            >
                                {this.props.text.buttonStarted}
                            </a>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <section className="content content-enjoyLearning">
                        <div className="enjoyIt-wrapper">
                            <div className="enjoyIt-heading">
                                <h2>{this.props.text.headPleasure}</h2>
                                <p>
                                    {ReactHtmlParser(
                                        this.props.text.contentPleasure
                                    )}
                                </p>
                            </div>
                            <div className="imgEnjoy">
                                <img src={imgEnjoy} alt="Enjoy learning" />
                            </div>
                        </div>
                    </section>

                    <section className="content content-context-memory">
                        <div className="context-title">
                            <h2 className="context-heading">
                                {this.props.text.headMemory}
                            </h2>
                            <p>{this.props.text.contentMemory}</p>
                        </div>
                        <div className="img-context-puzzle">
                            <img src={puzzle} alt="Context puzzle" />
                        </div>
                    </section>

                    <section
                        className="content content-ourApp"
                        id={this.sections.toGetStarted.id}
                        ref={this.sections.toGetStarted.ref}
                    >
                        <div className="app-download-wrapper">
                            <div className="img-phone">
                                <img
                                    src={phoneBackground}
                                    className="img-phone-back"
                                    alt="Mobile background"
                                />
                                <img
                                    src={phone}
                                    className={mobileClasses}
                                    ref={this.mobileWow}
                                    alt="EasyLang app"
                                />
                            </div>
                            <div className="content-description">
                                <h2>
                                    {ReactHtmlParser(
                                        this.props.text.headOurApp
                                    )}
                                </h2>
                                <p>
                                    {ReactHtmlParser(
                                        this.props.text.contentOurApp
                                    )}
                                </p>
                                <div className="button-block">
                                    <div className="button-group button-group-1">
                                        <a
                                            className="button-install button-chrome"
                                            href="https://github.com/easably/extension/releases/download/0.1.2/extension-master.zip"
                                        >
                                            {this.props.text.extension}
                                        </a>
                                        <a
                                            href="https://github.com/easably/extension/blob/master/README.md"
                                            className="button-install button-guide"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            role="button"
                                        >
                                            <i className="fa fa-cog"> </i>{" "}
                                            <span>
                                                {this.props.text.extensionGuide}
                                            </span>
                                        </a>
                                    </div>

                                    <div className="button-group button-group-2">
                                        <a
                                            className="button-install button-web"
                                            href="http://easy4learn.com/tutor"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Web
                                        </a>
                                    </div>

                                    <div className="button-group button-group-3">
                                        <a
                                            className="button-install button-android"
                                            href="https://github.com/easably/context-tutor/releases/download/0.1.11/app-debug.apk"
                                        >
                                            Android
                                        </a>
                                        <a
                                            className="button-install button-iOS"
                                            href="https://testflight.apple.com/join/w0Dyxqef"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            iOS
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        className="content content-howItWorks"
                        id={this.sections.howItWork.id}
                        ref={this.sections.howItWork.ref}
                    >
                        <div>
                            <h2>{this.props.text.headHowItWorks}</h2>
                            <div className="slider-wrapper">
                                <div className="slider">
                                    <Slider
                                        className="slides"
                                        {...slickSettings}
                                    >
                                        <div className="slide 1th">
                                            <figure className="slick-slide-inner">
                                                <img src={slide1} alt="" />
                                                <figcaption className="image-carousel-caption">
                                                    {
                                                        this.props.text
                                                            .sliderCaptionFirst
                                                    }
                                                </figcaption>
                                            </figure>
                                        </div>

                                        <div className="slide 2th">
                                            <figure className="slick-slide-inner">
                                                <img src={slide2} alt="" />
                                                <figcaption className="image-carousel-caption">
                                                    {
                                                        this.props.text
                                                            .sliderCaptionSecond
                                                    }
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div className="slide 3th">
                                            <img
                                                src={
                                                    slideImg[
                                                        this.props.text
                                                            .slideThird
                                                    ]
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="slide 4th">
                                            <img
                                                src={
                                                    slideImg[
                                                        this.props.text
                                                            .slideFourth
                                                    ]
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </Slider>
                                </div>
                            </div>

                            <div className="extension">
                                <div className="extension-img">
                                    {" "}
                                    <img
                                        src={extensionImg}
                                        alt="extension for Chrome"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="call-to-action">
                        <section
                            className="content content-sources"
                            id={this.sections.source.id}
                            ref={this.sections.source.ref}
                        >
                            <div className="sources-wrapper">
                                <div className="sources-title">
                                    <h2>{this.props.text.headSource}</h2>
                                    <p>{this.props.text.contentSouce}</p>
                                </div>
                                <div className="sources-block">
                                    <div className="first-part">
                                        <div className="sources-paragraph">
                                            <h3>{this.props.text.movie}</h3>
                                            <p>
                                                {this.props.text.movieParagraph}
                                            </p>
                                        </div>
                                        <div className="sources-paragraph">
                                            <h3>{this.props.text.news}</h3>
                                            <p>
                                                {this.props.text.newsParagraph}
                                            </p>
                                        </div>
                                        <div className="sources-paragraph">
                                            <h3>{this.props.text.book}</h3>
                                            <p>
                                                {this.props.text.bookParagraph}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="second-part">
                                        <div className="sources-paragraph">
                                            <h3>{this.props.text.video}</h3>
                                            <p>
                                                {this.props.text.videoParagraph}
                                            </p>
                                        </div>
                                        <div className="sources-paragraph">
                                            <h3>{this.props.text.music}</h3>
                                            <p>
                                                {this.props.text.musicParagraph}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="blog">
                        <h2>{this.props.text.blog}</h2>
                        <div className="blog-button">
                            <Link to="/blog">{this.props.text.Blog}</Link>
                        </div>
                    </div>
                </div>
                <footer className="get-started-footer">
                    <div className="button-started get-started">
                        <a
                            className="get-started-button2"
                            href="#toGetStarted"
                            onClick={e => {
                                this.anchorClick(e, "toGetStarted");
                            }}
                        >
                            {this.props.text.getStarted}
                        </a>
                    </div>
                </footer>
                <div className="anchor">
                    <ul className="anchor-links">{anchorLinks}</ul>
                </div>
            </div>
        );
    }
}
