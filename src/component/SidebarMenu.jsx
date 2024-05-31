import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

export function SidebarMenu() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <>
      <Sidebar>
        <Box
          p={3}
          mx={2}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={8}
        >
          <Text as="b" fontSize="3xl">
            Konek
          </Text>
        </Box>
        <br />
        <Menu>
          <SubMenu label="🚞 Informasi Desa">
            <MenuItem onClick={() => router.push(`/admin/informasidesa`)}>
              ℹ️ Tentang Desa
            </MenuItem>
            <MenuItem onClick={() => router.push(`/admin/pengurusdesa`)}>
              🧑‍💼 Pengurus Desa
            </MenuItem>
          </SubMenu>
          <SubMenu label="📓 Berita">
            <MenuItem onClick={() => router.push(`/admin/berita`)}>
              📑 List Berita
            </MenuItem>
            <MenuItem onClick={() => router.push(`/admin/komentar`)}>
              🗣️ Komentar
            </MenuItem>
          </SubMenu>
          <MenuItem onClick={() => router.push(`/admin/pemilihankepaladesa`)}>
            🗳️ Pemilihan Kepala Desa
          </MenuItem>
          <MenuItem onClick={() => router.push(`/admin/pengaduanmasyarakat`)}>
            📝 Pengaduan Masyarakat
          </MenuItem>
          <SubMenu label="🗄️ UMKM">
            <MenuItem onClick={() => router.push(`/admin/umkm`)}>
              🍕 UMKM
            </MenuItem>
            <MenuItem onClick={() => router.push(`/admin/umkm/jenis`)}>
              🪧 Jenis UMKM
            </MenuItem>
          </SubMenu>
          <MenuItem onClick={() => router.push(`/admin/warga`)}>
              🪪 Warga
            </MenuItem>          
          <MenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            🔒 Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
