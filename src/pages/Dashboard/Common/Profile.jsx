import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import splitBloodAnimation from "../../../assets/json/split-blood.json"; // Import animation
import coverImg from "../../../assets/cork-board.jpg";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useRole from "../../../hooks/useRole";
import LottieBackground from "../../../components/LottieBackground/LottieBackground";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const navigate = useNavigate();
  console.log(user);
  // Fetch user data based on email using the new query function format
  const {
    data: fetchedUser,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("No email found");
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`
      );
      return data;
    },
    enabled: !!user?.email, // Only run the query if user has an email
  });

  // Redirect to login if user is not found (after logout)
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Show loading spinner while user or role data is being fetched
  if (isLoading || loading || isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle error fetching user data
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error fetching user data</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex justify-center items-center">
      {/* Lottie background */}
      <LottieBackground animationData={splitBloodAnimation} />
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {/* Content */}
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue={user?.displayName || "Guest User"}
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input
                          defaultValue={fetchedUser?.email || "N/A"}
                          placeholder="Email"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={coverImg} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={fetchedUser?.image || "/default-avatar.png"}
                    />
                    <h5 className="title">
                      {user?.displayName || "Guest User"}
                    </h5>
                  </a>
                  <p className="description">{role || "No Role Assigned"}</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br />
                  Your chick she so thirsty <br />
                  I'm in that two seat Lambo"
                </p>
              </CardBody>
              <hr />
              <div className="button-container">
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-facebook-f" />
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-google-plus-g" />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
