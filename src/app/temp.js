<Card>

                      <CardTitle title="Sign to use" />
                      <CardMedia>
                        <TextField
                           hintText="Username"
                           onChange={this.setUsername}
                        />
                        <br />
                        <TextField
                           hintText="Password" type="password"
                           onChange={this.setPassword}
                        />
                        <br />
                      </CardMedia>

                      <CardActions>
                        <RaisedButton label="Sign Up" secondary={true}
                            onMouseDown={this.signup}
                        />
                        <RaisedButton label="Sign In" primary={true}
                            onMouseDown={this.signin}
                        />
                      </CardActions>
                    </Card>