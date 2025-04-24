export async function fetchKakaoUserData(accessToken: string) {
    try {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const raw = await response.json();
        return {
            id: raw.id,
            email: raw.kakao_account?.email,
            emailVerified: raw.kakao_account?.is_email_verified,
            name: raw.kakao_account?.profile?.nickname,
            image: raw.kakao_account?.profile?.profile_image_url,
            createdAt: raw.connected_at,
            updatedAt: raw.connected_at,
            _raw: raw,
        };
    } catch (error) {
        console.error('Error fetching Kakao user data:', error);
        throw error;
    }
}