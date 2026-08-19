const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-copy-email]').forEach((button) => {
	button.addEventListener('click', async () => {
		const email = button.dataset.copyEmail;
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			const input = document.createElement('textarea');
			input.value = email;
			input.setAttribute('readonly', '');
			input.style.position = 'fixed';
			input.style.opacity = '0';
			document.body.appendChild(input);
			input.select();
			document.execCommand('copy');
			input.remove();
		}
		button.classList.add('copied');
		button.setAttribute('aria-label', 'Email copied');
		button.title = 'Email copied';
		window.setTimeout(() => {
			button.classList.remove('copied');
			button.setAttribute('aria-label', 'Copy email address');
			button.title = 'Copy email address';
		}, 1400);
	});
});
