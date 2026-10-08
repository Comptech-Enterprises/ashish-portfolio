/** Floating AshishGPT launcher (bottom-right). Takes visitors to the "Ask AshishGPT anything" section. */
export default function AshishGPT() {
  return (
    <a href="#search" className="gptfab" aria-label="Ask AshishGPT anything">
      <span className="gptfab__cloud" aria-hidden="true">Ask me anything ✨</span>
      <span className="gptfab__btn">
        <svg className="gptfab__icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2zm7 11l.9 2.6 2.6.9-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13zM5 14l.7 2 2 .7-2 .7L5 19.4l-.7-2-2-.7 2-.7.7-2z" />
        </svg>
        <span className="gptfab__label">AshishGPT</span>
      </span>
    </a>
  );
}
