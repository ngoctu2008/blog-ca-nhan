export default async function UnsubscribePage({ searchParams }: { searchParams: { email?: string; token?: string } }) {
  const { email, token } = searchParams;

  let message = "";
  let success = false;

  if (email && token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
      const data = await response.json();
      success = response.ok;
      message = data.message || data.error;
    } catch {
      message = "Co loi xay ra. Vui long thu lai sau.";
    }
  } else {
    message = "Thieu thong tin huy dang ky.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${success ? "bg-green-100" : "bg-red-100"}`}>
          {success ? (
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {success ? "Huy dang ky thanh cong" : "Khong the huy dang ky"}
        </h1>
        <p className="text-gray-500">{message}</p>
        <a href="/" className="inline-block mt-6 text-primary-600 hover:text-primary-700 font-medium">
          Ve trang chu
        </a>
      </div>
    </div>
  );
}
